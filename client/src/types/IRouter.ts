import React, {ReactComponentElement} from 'react';

export interface IRouter<Props = any>{
    exact: boolean, 
    component: React.FC | React.VFC,
    path: string
    nestedRoutes?: IRouter<Props>[],
    props?: Props
    index? : boolean
}

export interface IRoute <Props> extends IRouter{
    props: Props
}

export interface INavigate {
    to: string
}