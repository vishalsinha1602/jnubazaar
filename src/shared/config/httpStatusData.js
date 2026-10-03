export const HTTP_STATUS_GROUPS = [
  {
    range: '1xx',
    title: 'Informational',
    description: 'The request was received and the server is still working on it.',
    codes: [
      ['100', 'Continue'], ['101', 'Switching Protocols'], ['102', 'Processing'],
    ],
  },
  {
    range: '2xx',
    title: 'Success',
    description: 'The request completed successfully.',
    codes: [
      ['200', 'OK'], ['201', 'Created'], ['202', 'Accepted'], ['204', 'No Content'],
    ],
  },
  {
    range: '3xx',
    title: 'Redirection',
    description: 'The client needs to follow a redirect or use a cached response.',
    codes: [
      ['301', 'Moved Permanently'], ['302', 'Found'], ['304', 'Not Modified'],
      ['307', 'Temporary Redirect'], ['308', 'Permanent Redirect'],
    ],
  },
  {
    range: '4xx',
    title: 'Client Error',
    description: 'Something about the request or the caller prevented it from succeeding.',
    codes: [
      ['400', 'Bad Request'], ['401', 'Unauthorized'], ['403', 'Forbidden'],
      ['404', 'Not Found'], ['405', 'Method Not Allowed'], ['406', 'Not Acceptable'],
      ['408', 'Request Timeout'], ['409', 'Conflict'], ['410', 'Gone'],
      ['415', 'Unsupported Media Type'], ['422', 'Unprocessable Content'], ['429', 'Too Many Requests'],
    ],
  },
  {
    range: '5xx',
    title: 'Server Error',
    description: 'The server could not complete an otherwise valid request.',
    codes: [
      ['500', 'Internal Server Error'], ['501', 'Not Implemented'], ['502', 'Bad Gateway'],
      ['503', 'Service Unavailable'], ['504', 'Gateway Timeout'], ['505', 'HTTP Version Not Supported'],
    ],
  },
];

export const HTTP_METHODS = [
  ['GET', 'Retrieve data'],
  ['POST', 'Create or submit data'],
  ['PUT', 'Replace a resource'],
  ['PATCH', 'Update part of a resource'],
  ['DELETE', 'Remove a resource'],
  ['CONNECT', 'Establish a network tunnel'],
  ['OPTIONS', 'Ask which operations are supported'],
  ['HEAD', 'Retrieve headers without a response body'],
];

