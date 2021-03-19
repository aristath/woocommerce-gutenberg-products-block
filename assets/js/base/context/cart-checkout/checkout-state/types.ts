/**
 * Internal dependencies
 */
import type { emitterCallback } from '../../shared/event-emit';
import { STATUS } from './constants';
import type { ActionType } from './actions';

interface ErrorResponse {
	code: string;
	message: string;
	data: {
		status: number;
	};
}

interface SuccessResponse {
	// eslint-disable-next-line camelcase
	payment_result: {
		// eslint-disable-next-line camelcase
		payment_status: 'success' | 'failure' | 'pending' | 'error';
		// eslint-disable-next-line camelcase
		payment_details: Record< string, string > | Record< string, never >;
		// eslint-disable-next-line camelcase
		redirect_url: string;
	};
}

export type CheckoutResponse = SuccessResponse | ErrorResponse;

export interface PaymentResultDataType {
	message: string;
	paymentStatus: string;
	paymentDetails: Record< string, string > | Record< string, never >;
	redirectUrl: string;
}

export type CheckoutStateContextState = {
	redirectUrl: string;
	status: STATUS;
	hasError: boolean;
	calculatingCount: number;
	orderId: number;
	orderNotes: string;
	customerId: number;
	shouldCreateAccount: boolean;
	processingResponse: PaymentResultDataType | null;
};

export type CheckoutStateContextType = {
	// Checkout state provider dispatch function.
	checkoutStateDispatch: React.Dispatch< ActionType >;
	// True when checkout is complete and ready for redirect.
	isComplete: boolean;
	// True when the checkout state has changed and checkout has no activity.
	isIdle: boolean;
	// True when something in the checkout is resulting in totals being calculated.
	isCalculating: boolean;
	// True when checkout has been submitted and is being processed. Note, payment related processing happens during this state. When payment status is success, processing happens on the server.
	isProcessing: boolean;
	// True during any observers executing logic before checkout processing (eg. validation).
	isBeforeProcessing: boolean;
	// True when checkout status is AFTER_PROCESSING.
	isAfterProcessing: boolean;
	// True when the checkout is in an error state. Whatever caused the error (validation/payment method) will likely have triggered a notice.
	hasError: boolean;
	// This is the url that checkout will redirect to when it's ready.
	redirectUrl: string;
	// This is the ID for the draft order if one exists.
	orderId: number;
	// Order notes introduced by the user in the checkout form.
	orderNotes: string;
	// This is the ID of the customer the draft order belongs to.
	customerId: number;
	// Used to register a callback that will fire after checkout has been processed and there are no errors.
	onCheckoutAfterProcessingWithSuccess: ReturnType< typeof emitterCallback >;
	// Used to register a callback that will fire when the checkout has been processed and has an error.
	onCheckoutAfterProcessingWithError: ReturnType< typeof emitterCallback >;
	// Used to register a callback that will fire when the checkout has been submitted before being sent off to the server.
	onCheckoutBeforeProcessing: ReturnType< typeof emitterCallback >;
	// True when the checkout has a draft order from the API.
	hasOrder: boolean;
	// When true, means the provider is providing data for the cart.
	isCart: boolean;
	// Should a user account be created?
	shouldCreateAccount: boolean;
};
