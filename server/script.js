class OrderModel {
  constructor(data = {}) {
    this.items = data.items || [1, 2, 3];
    this.status = data.status || 'PENDING';
    this.total = data.total || 0;
    this.userId = data.userId || null;
  }
  testFunc(p) {
    console.log(p.total);
    console.log(p.status);
  }
  addItems(test) {
    let { total, status } = this;
    const result = { ...this, userId: 1 };
    console.log('result:', result);
    total += 1;
    console.log({ total, status });
    this.testFunc({ total, status });
  }
}
const p = new OrderModel();
p.addItems([4, 5, 6]);

// const arr = [1, 2, 3, 4];
// const total = arr.reduce((total, item) => {
//   console.log('total now: ', total);
//   console.log('item: ', item);
//   return (total += item);
// });
// console.log('total: ', total);
