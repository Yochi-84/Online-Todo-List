const url = new URL(window.location.href)
const params = url.searchParams;
const id = params.get("id")
let todo_list = []
document.querySelector('#whoseTodo').innerText = `${params.get("name")} 的 Todo`
fetch(`https://todo-json-00824.herokuapp.com/todo?userID=${id}&_sort=id&_order=desc`, {
  method: "GET",
  redirect: 'follow'
})
  .then(res => res.json())
  .then(result => {
    todo_list = result
    updateList()
    const tabs = [...document.getElementsByClassName('tabs-item')]

    tabs.forEach(item => {
      item.addEventListener('click', () => {
        if (!item.classList.contains('is-active')) {
          document.querySelector('.is-active').classList.remove('is-active')
          item.classList.add('is-active')
          switch (item.textContent) {
            case '全部':
              current_tabs = item.textContent
              break;
            case '待完成':
              current_tabs = item.textContent
              break;
            case '已完成':
              current_tabs = item.textContent
              break;
          }
          getList()
        }
      })
    })
  })
  .catch(err => console.log(err))

let show_list = [...todo_list]
let current_tabs = '全部'

function getList() {
  const list_block = document.querySelector('.todo-list')
  switch (current_tabs) {
    case '全部':
      show_list = [...todo_list]
      break;
    case '待完成':
      show_list = todo_list.filter(item => item.status === false)
      break;
    case '已完成':
      show_list = todo_list.filter(item => item.status === true)
      break;
  }

  let inner = ''
  show_list.forEach((item, index) => {
    if (item.status) {
      inner += `<li class="todo-item fw-4 p-relative" onclick="statusToggle(${index},${item.id})">
                  <span class="status-box mr-2 p-relative completed"></span><span class="todo-content">${item.content}</span><button class="del-btn p-absolute" onclick="deleteTodo(event,${index},${item.id})"></button>
                </li>`
    } else {
      inner += `<li class="todo-item fw-4 p-relative"  onclick="statusToggle(${index},${item.id})">
                  <span class="status-box mr-2"></span><span class="todo-content">${item.content}</span><button class="del-btn p-absolute" onclick="deleteTodo(event,${index},${item.id})"></button>
                </li>`
    }
  })

  list_block.innerHTML = inner
}

function getCounter() {
  const list_counter = document.querySelector('.counter')
  list_counter.innerText = `${todo_list.filter(item => item.status === false).length} 個待完成項目`
}

function enterCheck() {
  if (event.key === 'Enter') {
    addTodo()
  }
}

function addTodo() {
  const result = todo_list.indexOf(todo_list.find(item => item.content === document.getElementById('input').value))
  if (result < 0) {
    const newData = {
      content: document.getElementById('input').value,
      status: false
    }
    todo_list.unshift(newData)
    newData.userID = id
    fetch(`https://todo-json-00824.herokuapp.com/todo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      redirect: 'follow',
      body: JSON.stringify(newData)
    })
      .then(res => res.json())
      .then(result => result)
      .catch(err => console.log(err))

    if (todo_list.length === 1) {
      toggleBlock()
    }
    updateList()
    document.getElementById('input').value = ''
  }
}

function deleteTodo(e, index, id) {
  const result = todo_list.indexOf(todo_list.find(item => item.content === show_list[index].content))
  todo_list.splice(result, 1)
  fetch(`https://todo-json-00824.herokuapp.com/todo/${id}`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: 'follow'
  })
    .then(res => res.json())
    .then(result => result)
    .catch(err => console.log(err))
  if (todo_list.length < 1) {
    toggleBlock()
  } else {
    updateList()
  }

  // 防止點擊刪除時向上觸發 li 的 statusToggle 事件
  e.stopPropagation()
}

function updateList() {
  getList()
  getCounter()
}

// TODO: 全部清除，json-server 好像沒有提供一次 delete 多筆的做法，用 Promise.all 做?
function clearCompleted() {
  todo_list = todo_list.filter(item => item.status === false)
  if (todo_list.length < 1) {
    toggleBlock()
  } else {
    getList()
  }
}

function toggleBlock() {
  const todo_block = document.querySelector('#todo-block')
  const empty_block = document.querySelector('#empty-block')
  todo_block.classList.toggle('d-none')
  empty_block.classList.toggle('d-none')
}

function statusToggle(index, id) {
  const result = todo_list.find(item => item.content === show_list[index].content)
  result.status = !result.status
  fetch(`https://todo-json-00824.herokuapp.com/todo/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    redirect: 'follow',
    body: JSON.stringify({ "status": result.status })
  })
    .then(res => res.json())
    .then(result => result)
    .catch(err => console.log(err))
  updateList()
}