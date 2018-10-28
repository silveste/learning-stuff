const APIURL = '/api/todos/'; //It should be an ENV variable


export async function getTodos(){
  return fetch(APIURL)
    .then(resp => {
      if(!resp.ok){
        if(resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.errorMessage};
            throw err;
          });
        } else {
          let err = {errorMessage: 'Server not responding, please try again later'};
          throw err;
        }
      }
      return resp.json();
    });
}

export async function createTodo(todo){
  return fetch(APIURL, {
    method: 'post',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({name: todo})
  })
    .then(resp => {
      if(!resp.ok){
        if(resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.errorMessage};
            throw err;
          });
        } else {
          let err = {errorMessage: 'Server not responding, please try again later'};
          throw err;
        }
      }
      return resp.json();
    });
}

export async function removeTodo(id){
  const URL = APIURL + id;
  return fetch(URL, {
    method: 'delete'
  })
    .then(resp => {
      if(!resp.ok){
        if(resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.errorMessage};
            throw err;
          });
        } else {
          let err = {errorMessage: 'Server not responding, please try again later'};
          throw err;
        }
      }
      return resp.json();
    });
}

export async function updateTodo(todo){
  const URL = APIURL + todo._id;
  return fetch(URL, {
    method: 'put',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    body: JSON.stringify({completed: !todo.completed})
  })
    .then(resp => {
      if(!resp.ok){
        if(resp.status >= 400 && resp.status < 500) {
          return resp.json().then(data => {
            let err = {errorMessage: data.errorMessage};
            throw err;
          });
        } else {
          let err = {errorMessage: 'Server not responding, please try again later'};
          throw err;
        }
      }
      return resp.json();
    });
}
