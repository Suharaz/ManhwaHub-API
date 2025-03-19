export function renderMoney(value) {
    if (value > 1000) {
      return value.toLocaleString('vi-VN') + ' VNĐ';
    }
    return value + ' VNĐ';
  }

export const parseStyleString = (styleString) => {
    return styleString.split(';').reduce((styleObject, styleProperty) => {
        const [property, value] = styleProperty.split(':');
        if (property && value) {
            styleObject[property.trim()] = value.trim();
        }
        return styleObject;
    }, {});
};

