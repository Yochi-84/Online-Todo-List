let todo_list = [
  {
    content:'把冰箱發霉的檸檬拿去丟',
    status: false
  },
  {
    content:'打電話叫媽媽匯款給我',
    status: true
  },
  {
    content:'整理電腦資料夾',
    status: false
  },
  {
    content:'繳電費水費冷氣費',
    status: true
  },
  {
    content:'約vicky禮拜三泡溫泉',
    status: false
  },
  {
    content:'約ada禮拜四吃晚餐',
    status: true
  }
]

let show_list = [...todo_list]
let current_tabs = '全部'

window.onload = function () {
  // 進入頁面先更新列表
  updateList()
  const tabs = [...document.getElementsByClassName('tabs-item')]

  tabs.forEach(item => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('is-active')){
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
}

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
  show_list.forEach((item,index) => {
    if (item.status) {
      inner += `<li class="todo-item fw-4 p-relative" onclick="statusToggle(${index})">
                  <span class="status-box mr-2 p-relative completed"></span><span class="todo-content">${item.content}</span><button class="del-btn p-absolute" onclick="deleteTodo(event,${index})"></button>
                </li>`
    } else {
      inner += `<li class="todo-item fw-4 p-relative"  onclick="statusToggle(${index})">
                  <span class="status-box mr-2"></span><span class="todo-content">${item.content}</span><button class="del-btn p-absolute" onclick="deleteTodo(event,${index})"></button>
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
  if(event.key === 'Enter') {
    addTodo()
  }
}

function addTodo() {
  const result = todo_list.indexOf(todo_list.find(item => item.content === document.getElementById('input').value))
  console.log(result);
  if (result < 0){
    todo_list.unshift({content: document.getElementById('input').value, status: false})
    if(todo_list.length === 1) {
      toggleBlock()
    }
    updateList()
    document.getElementById('input').value = ''
  }
}

function deleteTodo(e, index) {
  const result = todo_list.indexOf(todo_list.find(item => item.content === show_list[index].content))
  todo_list.splice(result, 1)
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

function statusToggle(index) {
  const result = todo_list.find(item => item.content === show_list[index].content)
  result.status = !result.status
  updateList()
}