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

const mapStateToProps = ({ cart: { total } } : { cart : CartType, }) : Object => ({
  grandTotal: total,
  hidden: !total,
});

export default connect(mapStateToProps)(CheckoutButton);
