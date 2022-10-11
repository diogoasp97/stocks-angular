import { Opiniao } from "../opiniao/opiniao";

export interface Stock {
    id: number;
    name: string;
    ticker: string;
    marketCap: string;
    simMarketCap: string;
    website: string;
    logo: string;
    opinioes: Opiniao[];
}