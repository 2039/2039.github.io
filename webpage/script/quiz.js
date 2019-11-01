
const correct = ["q1_1", "q2_3", "q3_4"];
const questions = ["q1", "q2", "q3"];

function checkAnswers(){
	//get radio inputs, if right set color green, if wrong set color red, count score
	let choices = document.getElementsByTagName("input");
	let score = 0;
	for(let c of correct){
		document.getElementById(c).parentNode.style.background = "green";
	}
	for(let c of choices){
		if(c.checked){
			if(correct.includes(c.id)){
				score++;
			}else{
				document.getElementById(c.id).parentNode.style.background = "red";
			}
		}
	}
	return score;
}

function checkAllAnswered(){
	//check that all questions have been answered
	let allSelected = true;
	for(let q of questions){
		let aselected = false;
		for(let i = 1; i<5;i++){
			let aid = q + "_" +i;
			aselected = aselected || document.getElementById(aid).checked;
		}
		if(!aselected){
			allSelected = false;
		}
	}
	return allSelected;
}

function submitAnswers(){
	let allAnswered = checkAllAnswered();
	let oute = document.getElementById("quiz_output");
	if(allAnswered){
		let score = checkAnswers();
		oute.innerHTML = "Score: " + score + "/" + correct.length + " correct";
	}
	oute.style.display = "block";
}
