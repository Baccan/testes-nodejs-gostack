function soma(a, b) {
  return a + b;
}

// Qual funcionalidade iremos testar e oq esperamos que ela execute
// Ex: 'se eu chamar a rota /authenticate com um usuário válido, ela deve me retornar um token JWT'
test('if i call soma function with 4 and 5 it should return 9', () => {
  const result = soma(4, 5);

  // expect() retorna o resultado de uma função e compara com algum valor
  expect(result).toBe(9);
});
