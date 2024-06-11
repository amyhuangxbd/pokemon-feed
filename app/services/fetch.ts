async function fetchHandling(url: string, options = {}) {
    try {
      const response = await fetch(url, options);
  
      if (!response.ok) {
        handleHTTPError(response);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      // 捕获网络错误或其他异常
      console.error('Fetch error:', error);
      throw error;
    }
  }
  
  // 统一处理 HTTP 错误
  function handleHTTPError(response: Response) {
    let msg = '';
    switch (response.status) {
      case 400:
        console.error('Bad Request:', response);
        msg = 'Bad Request:' + response.status
        break;
      case 401:
        console.error('Unauthorized:', response);
        msg = 'Unauthorized:' + response.status
        break;
      case 403:
        console.error('Forbidden:', response);
        msg = 'Forbidden:' + response.status;
        break;
      case 404:
        console.error('Not Found:', response);
        msg = 'Not Found:' + response.status;
        break;
      case 500:
        console.error('Internal Server Error:', response);
        msg = 'Internal Server Error:' + response.status;
        break;
      default:
        msg = 'HTTP Error:' + response.status;
        console.error('HTTP Error:', response);
    }
    alert(msg)
    throw new Error(`HTTP Error: ${response.status}`);
  }
  
  export default fetchHandling;
  