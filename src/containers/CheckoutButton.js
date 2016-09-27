/**
 * @flow
 * @module CheckoutButtonContainer
 *
 * @author Oleg Nosov <olegnosov1@gmail.com>
 * @license MIT
 *
 * @description
 * Redux container for CheckoutButton
 */
import { connect } from 'react-redux';
import CheckoutButton from '../components/CheckoutButton';

const mapStateToProps = ({ cart: { total, products } } : { cart : CartType, }) : Object => ({
  grandTotal: total,
  hidden: !Object.keys(products).length,
});

export default connect(mapStateToProps)(CheckoutButton);
