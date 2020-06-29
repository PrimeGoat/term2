function recur(num) {
	return (num - 1 < 0) ? 0 : recur(num - 1) + num;
}




console.log(recur(3));