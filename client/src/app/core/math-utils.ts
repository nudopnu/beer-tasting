export class MathUtils {

    static avg(items: Array<number>): number {
        let sum = 0;
        items.forEach(item => {
            sum += item;
        });
        return sum / items.length;
    }
    
}