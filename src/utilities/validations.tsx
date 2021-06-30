export enum InputType {
    email,
    password,
    shortText,
    longText,
    name,
}

export const validator = (value: string, type?: InputType): boolean => {
    switch (type) {
        case InputType.email:
            return inRange(value, 3) && isEmail(value) && isHWChar(value)
        case InputType.password:
            return inRange(value, 8) && isHWChar(value)
        case InputType.shortText:
            return inRange(value, 0, 20)
        case InputType.longText:
            return inRange(value, 0, 256)
        case InputType.name:
            return inRange(value, 1, 30)
        default:
            return inRange(value) && isHWChar(value)
    }
}

const isHWChar = (str: string): boolean => {
    // eslint-disable-next-line
    const regex = new RegExp(/^[^\x01-\x7E\xA1-\xDF]+$/)
    return !regex.test(str)
}

const inRange = (value: string, low: Number = 0, high: Number = 256): boolean => {
    const vl = value.length
    return (vl >= low) && (vl <= high)
}

const isEmail = (str: string): boolean => {
    // eslint-disable-next-line
    const regex = new RegExp(/.+@.+\..+/)
    return regex.test(str)
}