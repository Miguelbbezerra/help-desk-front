export async function markAsViewed(id) {
    try {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            viewed: true
        });

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const result = await fetch(`http://localhost:5000/notification/${id}`, requestOptions)
        return result.data

    } catch (error) {
        console.error('Error marking notification as viewed:', error);
    }
};