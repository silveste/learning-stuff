const deleteProduct = (btn) => {
  const productId = btn.parentNode.querySelector('[name=productId]').value;
  const csrf = btn.parentNode.querySelector('[name=_csrf]').value;

  const productCard = btn.closest('article');

  fetch(`/admin/product/${productId}`, {
    method: 'DELETE',
    headers: {
      'csrf-token': csrf
    }
  })
  .then(res => {
    return res.json()
  })
  .then(data => {
    console.log(data);
    // Not supported by nIghtmarE browser
    // productCard.remove()
    console.log(productCard);
    productCard.parentNode.removeChild(productCard);
  })
  .catch(err => console.log(err.json()));
}
