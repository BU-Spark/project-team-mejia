import * as yup from 'yup'

export const formSchema=yup.object().shape({
    name: yup.string().required('Please enter name of organization!'),
    email:yup.string().email('Please enter valid email!').required('Please enter email!'),
    phone: yup.string().required('Please enter phone number!'),
    website: yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
    ).required('Enter url for organization website!') ,
    need_help: yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
    ).required('Enter url for organization request aid page!'),
    give_help: yup.string().matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
    ).required('Enter url for organization offer aid page!'),
    address_one: yup.string().required('Please enter an address!'),
    address_two: yup.string(),
    city: yup.string().required('Please enter a city!'),
    state: yup.string().required('Please enter a state!'),
    zip: yup.string().required('Please enter a zip code'),
});
