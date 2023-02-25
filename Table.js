class Table{

  constructor(arr) {
    // criando um cabeçalho e removendo em seguida
    // para pagar o array inteiro depois
    this.header = arr[0];
    arr.shift();
    this.rows = arr;
  }

  // transformando em método virtual  
  get RowCount() {
    return this.rows.length;
  }
  
  get ColumnCount() {
    return this.header.length;
  }
}

module.exports = Table;