import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import userSlice from '@/store/reducers/userSlice';

const store = configureStore({
	reducer: {
		userSlice
	}
});
export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
// 	RootState,
// 	unknown,
// 	Action<string>>;
export type ExtraCaseAction<T = any> = {
	payload: T;
	type: string;
}
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;