import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, DefaultRootState, useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
interface UseThunkProps {
	reduxSelector: (state: any) => any;
	action: any;
	actionParams?: any | any[];
	fetchOnInit?: boolean;
}
export function useThunk(props: UseThunkProps, deps: any[] = []) {
	const fetchOnInit = props.fetchOnInit === undefined ? true : false;
	const { action, reduxSelector } = props;
	const actionParams = Array.isArray(props.actionParams)
		? props.actionParams
		: props.actionParams === undefined
		? []
		: [props.actionParams];
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const stateSlice = useSelector(reduxSelector);
	const thunkDispatch = useDispatch() as ThunkDispatch<
		DefaultRootState,
		{},
		Action<any>
	>;

	const effect = useCallback(async () => {
		setIsLoading(true);
		await thunkDispatch(
			actionParams.length > 0 ? action(...actionParams) : action()
		);
		setIsLoading(false);
		return;
	}, [thunkDispatch, ...actionParams, ...deps]);

	useEffect(() => {
		if (fetchOnInit) effect();
	}, [effect]);

	return [stateSlice, isLoading, effect];
}
