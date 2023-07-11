export const funcVal = (data) => {
	const errorForm = {
		ccms: false,
		email: false,
		name: false,
		lastname: false,
		country: false,
		position: false,
		inDate: false,
		wave: false,
	};
	let error = false;
	if (!data.name) {
		errorForm.name = true;
		error = true;
	}
	if (!data.lastname) {
		errorForm.lastname = true;
		error = true;
	}
	if (!data.position) {
		errorForm.position = true;
		error = true;
	}
	if (!data.country) {
		errorForm.country = true;
		error = true;
	}
	if (data.inDate) {
		const vd = valDate(data.inDate);
		if (vd) {
			errorForm.inDate = true;
			error = true;
		}
	} else {
		errorForm.inDate = true;
		error = true;
	}
	if (data.email) {
		const vemail = valEmail(data.email);
		if (vemail) {
			errorForm.email = true;
			error = true;
		}
	} else {
		errorForm.email = true;
		error = true;
	}
	if (!data.wave) {
		errorForm.wave = true;
		error = true;
	}
	return { errorForm, error };
};

export const valDate = (date) => {
	try {
		const now = new Date().getFullYear();
		const dateForm = new Date(date).getFullYear();
		if (dateForm <= now) {
			return false;
		} else {
			return true;
		}
	} catch (error) {
		return true;
	}
};

export const valEmail = (email) => {
	let regex = new RegExp("[.a-z0-9]+@[.a-z]+.com");
	try {
		let valTP = email.split("@")[1].includes("teleperformance");
		if (regex.test(email) && valTP) {
			return false;
		} else {
			return true;
		}
	} catch (error) {
		return true;
	}
};
export const valEmailFeel = (email) => {
	let regex = new RegExp("[.a-z0-9]+@[.a-z]+.com");
	try {
		let valTP = email.split("@")[1].includes("feel.teleperformance.com");
		if (regex.test(email) && valTP) {
			return false;
		} else {
			return true;
		}
	} catch (error) {
		return true;
	}
};
