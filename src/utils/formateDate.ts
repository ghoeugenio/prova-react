const formateDate = (date: Date) => {
	const formatedDate = new Date(date);

	console.log(formatedDate);

	const day =
		formatedDate.getDate() < 10
			? '0' + formatedDate.getDate()
			: formatedDate.getDate();

	const trueMounth = formatedDate.getMonth() + 1;

	const mounth = trueMounth < 10 ? '0' + trueMounth : trueMounth;

	return day + '/' + mounth + '/' + formatedDate.getFullYear();
};

export default formateDate;
