export const convertToNumber = (value: string) => {
    const getPrice = value.replace(/[^0-9]/g, "")
    const values =  parseFloat(getPrice)

    return values
}