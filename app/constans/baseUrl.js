let baseUrl

// Kiểm tra xem chúng ta có ở trong môi trường client không
if (typeof window !== 'undefined') {
    baseUrl = window.location.origin;
} else { 
    baseUrl = 'http://localhost:3000';
}

const URL = `${baseUrl}/api`

export default URL