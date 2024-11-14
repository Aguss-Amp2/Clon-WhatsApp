// Obtiene la fecha actual en formato 'min:horas: dias/meses'
const getFormattedDateMMHHDDMM = () => {
    // Crear un objeto Date con la fecha actual
    const fecha_actual = new Date()
    return `${fecha_actual.getHours()}:${fecha_actual.getMinutes()}`
}

export default getFormattedDateMMHHDDMM