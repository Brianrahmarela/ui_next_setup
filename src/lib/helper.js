export const convDateToString = (dates) => {
    let year = dates?.getFullYear();
    let month = String(dates?.getMonth() + 1).padStart(2, '0');
    let day = String(dates?.getDate()).padStart(2, '0');
    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate
}

export const formatAngka = (angka) => {
    return new Intl.NumberFormat('id-ID').format(angka);
};