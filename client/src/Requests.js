let error = '';
let requestResult = {
    succeeded: '',
    error: '',
    data: ''
}
export async function getRequest(currentUrl) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/${currentUrl}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }) // רק אם קיים טוקן
            }
        });
        if (response.ok) {
            requestResult.succeeded=true;
            requestResult.data = await response.json();
        } else {
            requestResult.error = 'Something went wrong. Please try again.';
            requestResult.succeeded=false;
        }
    } catch (err) {
        requestResult.error= 'Something went wrong. Please try again.';
        requestResult.succeeded=false;
    }
    return requestResult
}
export async function postRequest(currentUrl, body) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/${currentUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }) // רק אם קיים טוקן
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            requestResult.succeeded=true;
            requestResult.data = await response.json();
        } else {
            requestResult.error = 'Something went wrong. Please try again.';
            requestResult.succeeded=false;
        }
    } catch (err) {
        requestResult.error = 'Something went wrong. Please try again.';
        requestResult.succeeded=false;
    }
    return requestResult
}
export async function putRequest(currentUrl, body) {
    error = '';
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/${currentUrl}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }) // רק אם קיים טוקן
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            requestResult.succeeded=true;
            requestResult.data = await response.json();
        } else {
            requestResult.error = 'Something went wrong. Please try again.';
            requestResult.succeeded=false;
        }
    } catch (err) {
        requestResult.error = 'Something went wrong. Please try again.';
        requestResult.succeeded=false;
    }
    return requestResult
}
export async function deleteRequest(currentUrl) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3001/${currentUrl}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { 'Authorization': `Bearer ${token}` }) // רק אם קיים טוקן
            }
        } );
        console.log(currentUrl);
        if (response.ok) {
            requestResult.succeeded=true;
        } else {
            requestResult.error = 'Something went wrong. Please try again.';
            requestResult.succeeded=false;
        }
    } catch (err) {
        requestResult.error = 'Something went wrong. Please try again.';
        requestResult.succeeded=false;
        console.log("cfghjhcgxvbjhknbhvbjnk");
    }
    return requestResult
}
