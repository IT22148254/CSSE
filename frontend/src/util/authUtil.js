export const getHospitalData = () => {
    const hsp = localStorage.getItem('hsp');
    return hsp ? JSON.parse(hsp) : null;
};