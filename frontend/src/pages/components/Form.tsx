import * as React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReCAPTCHA from 'react-google-recaptcha';
import { requirePropFactory, TextField } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
import { Formik } from 'formik';
import { withTranslation } from 'react-i18next';

import './form.css';
import { formSchema } from '../../validations/FormValidation';

// Defining types for props and state
interface FormProps {
    parentCallback: Function,
    t: Function
}

interface FormState {
    name: string,
    neighborhood: Array<string>,
    phone: string,
    email: string,
    website: string,
    need_help: string,
    give_help: string,
    address_one: string,
    address_two: string,
    city: string,
    state: string,
    zip: string,
    show: boolean,
    submitDisabled: boolean
}

// a array of all neighborhoods
const neighborhoods = [
    "Boston-wide",
    "Allston",
    "Back Bay",
    "Bay Village",
    "Beacon Hill",
    "Brighton",
    "Charlestown",
    "Chinatown",
    "Dorchester",
    "Downtown",
    "East Boston",
    "Fenway",
    "Harbor Islands",
    "Hyde Park",
    "Jamaica Plain",
    "Leather District",
    "Longwood",
    "Mattapan",
    "Mission Hill",
    "North End",
    "Roslindale",
    "Roxbury",
    "South Boston",
    "South Boston Waterfront",
    "South End",
    "West End",
    "West Roxbury"
]

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const backend_url = process.env.BACKEND_URL;

export class Form extends React.Component<FormProps, FormState> {
    constructor(props: FormProps) {
        super(props);
        const initialState = {
            name: '',
            neighborhood: ['Boston-wide'],
            phone: '',
            email: '',
            website: '',
            need_help: '',
            give_help: '',
            address_one: '',
            address_two: '',
            city: '',
            state: '',
            zip: '',
            show: false,
            submitDisabled: true
        }
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.onChange = this.onChange.bind(this);
    }


    handleChange = (event: any, setFieldValue: Function) => {
        // React way of preventing default event handling behavior
        event.preventDefault();
        const { name, value } = event.target;
        if (name !== "neighborhood") {
            setFieldValue(name, value);
        }
        this.setState(Object.assign(this.state, {[name]: value}));
    }
    

    handleSubmit = async () => {
        // Change phone number format
        let phone = "("
        phone+= this.state.phone.substring(0,3)
        phone+= ") "
        phone+= this.state.phone.substring(3,6)
        phone+= "-"
        phone+= this.state.phone.substring(6,10)
        // event.preventDefault();
        let formData = {
            name: this.state.name,
            neighborhood: this.state.neighborhood.join(),
            email: this.state.email,
            phone: phone,
            website: this.state.website,
            need_help: this.state.need_help,
            give_help: this.state.give_help,
            address_one: this.state.address_one,
            address_two: this.state.address_two,
            city: this.state.city,
            state: this.state.state,
            zip: this.state.zip,
        };
        axios({
            url: backend_url + '/location/add',
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            data: formData
        })
            .then((res:any) => {
                // console.log('Successfully added');
                this.handleClose();
                this.props.parentCallback();
            })
            .catch((err:any) => {
                console.log(err)
            });
    }

    handleClose() {
        this.setState({show: false, name: '', neighborhood: ['Boston-wide'], phone:'', email:'', website:'', need_help:'', give_help: '', address_one:'', address_two:'', city:'', state:'',zip:''})
    }

    handleShow() {
        this.setState({show: true})
    }

    onChange(value) {
        // let result = validateHuman(value); 
        console.log("Captcha Value:", value);
        axios.post(backend_url + '/form/validate', {token: value})
            .then((res: any) => {
                let isHuman = res.data.isHuman;
                this.setState({submitDisabled: !isHuman});
            })
            .catch((err: any) => {
                alert('something went wrong, please try again');
            })
        //this.reCaptchaRef.current.reset();
    }

    render() {
        const { name, neighborhood, phone, email, website, need_help, give_help, address_one, address_two, city, state, zip } = this.state;
        const { t } = this.props;
        const changeHandler = this.handleChange;
        const submitDisabled = this.state.submitDisabled;
        const recaptchaHandler = this.onChange;
        return (
            <div className='form-container'>
                <Button id="add-org-button" className="btn-primary" variant="light" onClick={this.handleShow}>
                    <h6>{t('add_org')}</h6></Button>
                <Modal className="" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Organization</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{name: this.state.name,
                                phone: phone,
                                email: this.state.email,
                                website: this.state.website,
                                need_help: this.state.need_help,
                                give_help: this.state.give_help,
                                address_one: this.state.address_one,
                                address_two: this.state.address_two,
                                city: this.state.city,
                                state: this.state.state,
                                zip: this.state.zip}}
                        validationSchema={formSchema}
                        onSubmit={this.handleSubmit}>
                            {(props) => {
                                const {
                                    values,
                                    touched,
                                    errors,
                                    dirty,
                                    isSubmitting,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    handleReset,
                                    setFieldValue
                                } = props;
                                return (<form onSubmit={handleSubmit} noValidate className="form">
                                <div className="input-wrapper">
                                    <TextField
                                        id="name"
                                        className="input-box"
                                        name="name"
                                        label={t("name")}
                                        value={name}
                                        variant="outlined"
                                        onChange={(e) => changeHandler(e, setFieldValue)}
                                        error={Boolean(errors.name) && Boolean(touched.name)}
                                        helperText={(errors.name && touched.name) && errors.name}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <TextField
                                        id="email"
                                        className="input-box"
                                        name="email"
                                        label={t('email')}
                                        value={email}
                                        variant="outlined"
                                        onChange={(e) => changeHandler(e, setFieldValue)}
                                        error={Boolean(errors.email) && Boolean(touched.email)}
                                        helperText={(errors.email && touched.email) && errors.email}
                                    />
                                    <TextField
                                    id="phone"
                                    name="phone"
                                    className="input-box"
                                    label={t('phone')}
                                    value={phone}
                                    variant="outlined"
                                    onChange={(e) => changeHandler(e, setFieldValue)}
                                    error={Boolean(errors.phone) && Boolean(touched.phone)}
                                    helperText={(errors.phone && touched.phone) && errors.phone}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <TextField
                                        id="website"
                                        className="input-box"
                                        name="website"
                                        label={t('website')}
                                        value={website}
                                        variant="outlined"
                                        onChange={(e) => changeHandler(e, setFieldValue)}
                                        error={Boolean(errors.website) && Boolean(touched.website)}
                                        helperText={(errors.website && touched.website) && errors.website}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <TextField
                                        id="need-help"
                                        className="input-box"
                                        name="need_help"
                                        label={t('request_aid_url')}
                                        value={need_help}
                                        variant="outlined"
                                        onChange={(e) => changeHandler(e, setFieldValue)}
                                        error={Boolean(errors.need_help) && Boolean(touched.need_help)}
                                        helperText={(errors.need_help && touched.need_help) && errors.need_help}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <TextField
                                        id="give-help"
                                        className="input-box"
                                        name="give_help"
                                        label={t('offer_aid_url')}
                                        value={give_help}
                                        variant="outlined"
                                        onChange={(e) => changeHandler(e, setFieldValue)}
                                        error={Boolean(errors.give_help) && Boolean(touched.give_help)}
                                        helperText={(errors.give_help && touched.give_help) && errors.give_help}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <TextField
                                        id="address_one"
                                        className="input-box"
                                        name="address_one"
                                        label={`${t('address')} 1`}
                                        value={address_one}
                                        variant="outlined"
                                        onChange={(e) => changeHandler(e, setFieldValue)}
                                        error={Boolean(errors.address_one) && Boolean(touched.address_one)}
                                        helperText={(errors.address_one && touched.address_one) && errors.address_one}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <TextField
                                        id="address_two"
                                        className="input-box"
                                        name="address_two"
                                        label={`${t('address')} 2`}
                                        value={address_two}
                                        variant="outlined"
                                        onChange={(e) => changeHandler(e, setFieldValue)}
                                        error={Boolean(errors.address_two) && Boolean(touched.address_two)}
                                        helperText={(errors.address_two && touched.address_two) && errors.address_two}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <TextField
                                        id="city"
                                        className="input-box"
                                        name="city"
                                        label={t('city')}
                                        value={city}
                                        variant="outlined"
                                        onChange={(e) => changeHandler(e, setFieldValue)}
                                        error={Boolean(errors.city) && Boolean(touched.city)}
                                        helperText={(errors.city && touched.city) && errors.city}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <TextField
                                        id="state"
                                        className="input-box"
                                        name="state"
                                        label={t('state')}
                                        value={state}
                                        variant="outlined"
                                        onChange={(e) => changeHandler(e, setFieldValue)}
                                        error={Boolean(errors.state) && Boolean(touched.state)}
                                        helperText={(errors.state && touched.state) && errors.state}
                                    />
                                </div>

                                <div className="input-wrapper">
                                    <TextField
                                        id="zip"
                                        className="input-box"
                                        name="zip"
                                        label={t('zip')}
                                        value={zip}
                                        variant="outlined"
                                        onChange={(e) => changeHandler(e, setFieldValue)}
                                        error={Boolean(errors.zip) && Boolean(touched.zip)}
                                        helperText={(errors.zip && touched.zip) && errors.zip}
                                    />
                                </div>

                                <div>
                                    <FormControl>
                                        <InputLabel id="demo-mutiple-chip-label">{t('neighborhood')}</InputLabel>
                                        <Select
                                            labelId="demo-mutiple-chip-label"
                                            id="demo-mutiple-chip"
                                            multiple
                                            name="neighborhood"
                                            value={neighborhood}
                                            onChange={(e) => changeHandler(e, setFieldValue)}
                                            input={<Input id="select-multiple-chip"/>}
                                            renderValue={(selected: any) => (
                                                <div>
                                                    {selected.map((value) => (
                                                        <Chip key={value} label={t(value)}/>
                                                    ))}
                                                </div>
                                            )}
                                            MenuProps={MenuProps}
                                        >
                                            {neighborhoods.map((n) => (
                                                <MenuItem key={n} value={n}>
                                                    {t(n)}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </div>

                                <div className='captcha'>
                                    <ReCAPTCHA sitekey={process.env.SITE_KEY}
                                               onChange={recaptchaHandler}/>
                                </div>

                                <div className='submit'>
                                    <button className="submit-button" id="bt-submit" type="submit"
                                            disabled={submitDisabled}>Submit
                                    </button>
                                </div>
                            </form> )}}
                        </Formik>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default withTranslation('translation')(Form);