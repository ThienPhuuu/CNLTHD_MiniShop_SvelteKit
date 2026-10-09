class UI {
	cartOpen = $state(false);
	toastMessage = $state('');
	private timer: ReturnType<typeof setTimeout> | undefined = undefined;

	openCart() {
		this.cartOpen = true;
	}
	closeCart() {
		this.cartOpen = false;
	}
	showToast(message: string) {
		this.toastMessage = message;
		clearTimeout(this.timer);
		this.timer = setTimeout(() => (this.toastMessage = ''), 2800);
	}
}

export const ui = new UI();
