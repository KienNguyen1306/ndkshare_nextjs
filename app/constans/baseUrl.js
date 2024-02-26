let bUrl 

// Kiểm tra xem chúng ta có ở trong môi trường client không
if (typeof window !== 'undefined') {
    bUrl = window.location.origin;
} else { 
    bUrl = 'http://localhost:3000';
}

const BASE_URL_API = `${bUrl}/api`

export default BASE_URL_API