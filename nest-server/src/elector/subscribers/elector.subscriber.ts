import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { ElectorService } from "../elector.service";
import { Elector } from "../entities";


@EventSubscriber()
export class ElectorSubscriber implements EntitySubscriberInterface<Elector>{
    constructor(
        dataSource: DataSource,
        private readonly electorService: ElectorService
    ){
        dataSource.subscribers.push(this);
    }

    listenTo(): string | Function {
        return Elector;
    }

    beforeInsert(event: InsertEvent<Elector>) {
        console.log('Before insert elector ', event.entity);
    }
}