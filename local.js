// id: task.length ? task[task.length - 1].id + 1 : 1,


// setItem("key", "value")       – ачкыч/баа жупту сактоо.
// getItem("key")                – ачкыч менен маанини алыңыз.
// removeItem("key")             – мааниси менен ачкычты алып салыңыз.
// clear()                       - баарын жок кылуу.
// key(index)                    – берилген позицияда ачкычты алуу.
// length                        – сакталган буюмдардын саны.

// JSON.stringify()             -  баардык маалыматты string кылып сактап берет
// JSON.parse()                 -  биринчи калыбна келтипет

const input = document.querySelector(".text-input");
const btn = document.querySelector(".add-btn");
const ul = document.querySelector(".list");
const err = document.querySelector("h4");

btn.addEventListener("click", () => {
	addTask();
	view();
});

input.addEventListener('keydown', (e) => {
     if(e.key === 'Enter'){
        addTask()
        view()
     }
})



function addTask() {
	if (input.value.trim() === "") {
		let ae = err.innerHTML = "404";

		err.style.color = "red";
		// localStorage.setItem("task", JSON.stringify(ae ))
	} else {
		const task = JSON.parse(localStorage.getItem("task")) || [];
		err.innerHTML = "";
		const newTask = {
			id: task.length ? task[task.length - 1].id + 1 : 1,
			title: input.value,
			isDone: false,
		};
		const result = [...task, newTask];

		localStorage.setItem("task", JSON.stringify(result));

		input.value = "";
	}
}




function view() {
	ul.innerHTML = "";
	const task = JSON.parse(localStorage.getItem("task")) || [];
	task.map((el) => {
		ul.innerHTML += `<li class="list-group-item d-flex align-items-center justify-content-between">
        <span class="${el.isDone ? "line" : ""}">
          <input type="checkbox" ${el.isDone ? "checked" : ""} class="check">
          ${el.title}
        </span>
     <button class="del-btn btn btn-danger">Delete</button>
</li>`;
	});
	delBtn();
	checkbox();
}

view();


function delBtn() {
	let task = JSON.parse(localStorage.getItem("task")) || [];
	const buttons = document.querySelectorAll(".del-btn");
	buttons.forEach((btn, idx) => {
		btn.addEventListener("click", () => {
			task = task.filter((el, index) => {
				return index !== idx;
			});
			localStorage.setItem("task", JSON.stringify("task"));
			view();
		});
	});
}

function checkbox() {
	let task = JSON.parse(localStorage.getItem("task")) || [];
	const checkBoxes = document.querySelectorAll(".check");
	checkBoxes.forEach((check, index) => {
		check.addEventListener("click", () => {
			task = task.map((el, idx) => {
				if (idx === index) {
					return { ...el, isDone: !el.isDone };
				} else {
					return el;
				}
			});
			localStorage.setItem("task", JSON.stringify(task));
			view();
		});
	});
}
checkBox();
