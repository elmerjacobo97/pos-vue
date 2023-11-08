export const formatCurrency = (amount) =>
  Number(amount).toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN'
  })
