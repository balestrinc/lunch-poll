class Poll {
  pollEndTime() {
    const currentDate = new Date();
    const noon = new Date(currentDate.getFullYear(), currentDate.getMonth(),
      currentDate.getDate(), 12, 0, 0, 0);
    return noon;
  }

  isPollOpen() {
    const currentDate = new Date();
    return currentDate < this.pollEndTime();
  }

}
export default Poll;
