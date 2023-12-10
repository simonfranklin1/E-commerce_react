export const formatCurrency = (valor, moeda) => {
    return valor.toLocaleString('pt-br', {
        style: 'currency',
        currency: moeda 
      })
}

export const saveLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getLocalStorage = (key) => {
    const arr = JSON.parse(localStorage.getItem(key));
    return arr;
}

export const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}

export const fetchUrl = async (url) => {

    const response = await fetch(url);
    const data = await response.json();

    return data;
}

export const validateCard = (text) => {    
    text = text.replace(/\D/g,"");
    text = text.replace(/(\d{4})/g, "$1."); 
    text = text.replace(/\.$/, "");
    text = text.substring(0, 19)
      
    return text;
}

export const validadeDate = (text) => {
    text = text.replace(/\D/g,""); // permite apenas dígitos
    text = text.replace(/(\d{2})/g, "$1/"); // adiciona uma "/" a cada 2 caracteres
    text = text.replace(/\/$/, ""); // se estiver sobrando uma "/" apaga
    text = text.substring(0, 5); // permite apenas 5 caracteres

    return text;
}

export const validateCVV = (text) => {
    text = text.replace(/\D/g,"");
    text = text.substring(0, 3);  

    return text; 
}

export const validateCpf = (cpf) => {
    cpf = cpf.replace(/\D/g,"");
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4');
}

export const insertMaskInPhone = (phone) => {
    const noMask = phone.replace(/\D/g, '');
    const { length } = noMask;
  
    if (length <= 11) {
      return noMask
        .replace(/\D/g,"")
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2');
    }
    return phone;    
}

export const insertMaskInCep = (text) => {
    text = text.replace(/\D/g,"");
    text = text.replace(/(\d{5})(\d)/, '$1-$2');
    text = text.substring(0, 9);

    return text;
}