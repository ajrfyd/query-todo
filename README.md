### axios baseUrl setting

```js
  const todosApi = axios.create({
    baseURL: 'http://localhost:3500'
  })
```


### useMutation

```js
  const addTodoMutation = useMutation(addTodo, {
      onSuccess: () => {
        // 성공 후 실행시킬 쿼리
        // 주석 처리 하면 할일을 추가 한 뒤 업데이트 안됨.
        queryClient.invalidateQueries('todos');
      }
    })
```