class GroupCreation {
	promise = Promise.resolve();

	queue(operation: () => Promise<void>) {
		this.promise = this.promise.then(operation);
	}
}

export default new GroupCreation();
