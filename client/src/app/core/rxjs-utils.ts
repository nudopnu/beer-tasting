import { groupBy } from "lodash";
import { Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";

export class RxjsUtils {

    static unpackArray<T>(): (source: Observable<T[]>) => Observable<T> {
        return mergeMap((x: T[]) => x);
    }

    static innerMap<S, T>(callbackfn: (value: S, index: number, array: S[]) => T) {
        return map((x: S[]) => x.map(callbackfn))
    }

    static innerFlatMap<S, T>(callbackfn: (value: S, index: number, array: S[]) => T[], thisArg?: any) {
        return map((x: S[]) => x.flatMap(callbackfn));
    }

    static innerGroupBy<T, U extends keyof T>(key: U) {
        function getGroups(x: T[]) {
            const groups = new Map<T[U], T[]>();
            x.forEach(elem => {
                const entryKey = elem[key];
                if (groups.has(entryKey)) {
                    groups.get(entryKey)!.push(elem);
                } else {
                    groups.set(entryKey, [elem]);
                }
            })
            return [...groups.entries()].map(entry => ({ key: entry[0], items: entry[1] }));
        }
        return map((x: T[]) => getGroups(x));
    }
}