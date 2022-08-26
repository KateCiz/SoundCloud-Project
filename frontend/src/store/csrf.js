import Cookies from 'js-cookie';

export async function csrfFetchFunction(url, options = {}) {
    //this makes the request method a GET method if no method is provided
    options.method = options.method || 'GET';
    //this makes the headers an empty object if no headers are provided
    options.headers = options.headers || {};


    //this sets the headers to application/json if the fetch has a request other 
    //than a get request and grabs the XSRF-TOKEN cookie to set the value of the
    //XSRF-Token header
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] =
          options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-Token'] = Cookies.get('XSRF-TOKEN');
      }
    //this will call the window's default with a fetch request that has the url and options as arguments
    const res = await window.fetch(url, options);

    //if there is an error code thrown that is 400 or higher, then that error code will be the response object
    if(res.status >= 400) throw res;

    return res;
}

export function restoreCSRF() {
    return csrfFetchFunction('/api/csrf/restore');
  }

export default csrfFetchFunction;