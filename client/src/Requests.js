// let error = '';
// let requestResult = {
//     succeeded: '',
//     error: '',
//     data: ''
// }
// export async function getRequest(currentUrl) {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`http://localhost:3001/${currentUrl}`, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(token && { 'Authorization': `Bearer ${token}` }) // רק אם קיים טוקן
//             }
//         });
//         if (response.ok) {
//             requestResult.succeeded=true;
//             requestResult.data = await response.json();
//         } else {
//             requestResult.error = 'Something went wrong. Please try again.';
//             requestResult.succeeded=false;
//         }
//     } catch (err) {
//         requestResult.error= 'Something went wrong. Please try again.';
//         requestResult.succeeded=false;
//     }
//     return requestResult
// }
// export async function postRequest(currentUrl, body) {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`http://localhost:3001/${currentUrl}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(token && { 'Authorization': `Bearer ${token}` }) // רק אם קיים טוקן
//             },
//             body: JSON.stringify(body),
//         });
//         if (response.ok) {
//             requestResult.succeeded=true;
//             requestResult.data = await response.json();
//         } else {
//             requestResult.error = 'Something went wrong. Please try again.';
//             requestResult.succeeded=false;
//         }
//     } catch (err) {
//         requestResult.error = 'Something went wrong. Please try again.';
//         requestResult.succeeded=false;
//     }
//     return requestResult
// }
// export async function putRequest(currentUrl, body) {
//     error = '';
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`http://localhost:3001/${currentUrl}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(token && { 'Authorization': `Bearer ${token}` }) // רק אם קיים טוקן
//             },
//             body: JSON.stringify(body),
//         });

//         if (response.ok) {
//             requestResult.succeeded=true;
//             requestResult.data = await response.json();
//         } else {
//             requestResult.error = 'Something went wrong. Please try again.';
//             requestResult.succeeded=false;
//         }
//     } catch (err) {
//         requestResult.error = 'Something went wrong. Please try again.';
//         requestResult.succeeded=false;
//     }
//     return requestResult
// }
// export async function patchRequest(currentUrl, body) {
//     error = '';
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`http://localhost:3001/${currentUrl}`, {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(token && { 'Authorization': `Bearer ${token}` }) // רק אם קיים טוקן
//             },
//             body: JSON.stringify(body),
//         });

//         if (response.ok) {
//             requestResult.succeeded=true;
//             requestResult.data = await response.json();
//         } else {
//             requestResult.error = 'Something went wrong. Please try again.';
//             requestResult.succeeded=false;
//         }
//     } catch (err) {
//         requestResult.error = 'Something went wrong. Please try again.';
//         requestResult.succeeded=false;
//     }
//     return requestResult
// }
// export async function deleteRequest(currentUrl) {
//     try {
//         const token = localStorage.getItem('token');
//         const response = await fetch(`http://localhost:3001/${currentUrl}`, {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json',
//                 ...(token && { 'Authorization': `Bearer ${token}` }) // רק אם קיים טוקן
//             }
//         } );
//         console.log(currentUrl);
//         if (response.ok) {
//             requestResult.succeeded=true;
//         } else {
//             requestResult.error = 'Something went wrong. Please try again.';
//             requestResult.succeeded=false;
//         }
//     } catch (err) {
//         requestResult.error = 'Something went wrong. Please try again.';
//         requestResult.succeeded=false;
//         console.log("cfghjhcgxvbjhknbhvbjnk");
//     }
//     return requestResult
// }


// פונקציה לקרוא קוקיז לפי שם
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
}

// פונקציה להוריד קוקיז לפי שם
function removeCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; HttpOnly`;
}

// שמירת refreshToken בקוקיז
function setRefreshTokenInCookies(refreshToken) {
    const expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1); // שמירה לשנה
    document.cookie = `refreshToken=${refreshToken}; expires=${expires.toUTCString()}; path=/; Secure; HttpOnly`;
}

// פונקציה לרענן את הטוקן במקרה של שגיאה 401 או 403
async function refreshTokenIfNeeded(response) {
    if (response.status !== 401 && response.status !== 403) return null;

    const refreshToken = getCookie('refreshToken'); // קריאה מהקוקיז
    if (!refreshToken) return null;

    const res = await fetch('http://localhost:3001/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: refreshToken }),
        credentials: 'include', // כלול את הקוקיז בבקשה
    });

    if (!res.ok) {
        localStorage.removeItem('token');
        removeCookie('refreshToken'); // מחיקת הקוקיז אם לא הצלחנו לרענן
        return null;
    }

    const data = await res.json();
    localStorage.setItem('token', data.accessToken);
    return data.accessToken;
}

// פונקציה לשלוח בקשה עם רענון טוקן במקרה של שגיאה
async function sendRequestWithRefresh(method, url, body = null) {
    const makeFetch = async (token) => {
        return fetch(`http://localhost:3001/${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }),
            },
            credentials: 'include', // כלול את הקוקיז בבקשה
            ...(body ? { body: JSON.stringify(body) } : {}),
        });
    };

    const token = localStorage.getItem('token');
    let response = await makeFetch(token);

    if (!response.ok) {
        const newToken = await refreshTokenIfNeeded(response);
        if (newToken) {
            response = await makeFetch(newToken);
        }
    }

    const result = {
        succeeded: response.ok,
        error: '',
        data: null,
    };

    if (response.ok) {
        try {
            result.data = await response.json();
        } catch {
            result.data = null;
        }
    } else {
        result.error = 'משהו השתבש. נסה שוב.';
    }

    return result;
}

// פונקציות לשליחת בקשות GET, POST, PUT, PATCH, DELETE
export async function getRequest(url) {
    return await sendRequestWithRefresh('GET', url);
}

export async function postRequest(url, body) {
    return await sendRequestWithRefresh('POST', url, body);
}

export async function putRequest(url, body) {
    return await sendRequestWithRefresh('PUT', url, body);
}

export async function patchRequest(url, body) {
    return await sendRequestWithRefresh('PATCH', url, body);
}

export async function deleteRequest(url) {
    return await sendRequestWithRefresh('DELETE', url);
}
