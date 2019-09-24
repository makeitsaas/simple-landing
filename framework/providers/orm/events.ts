import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import { LoadEvent } from 'typeorm/subscriber/event/LoadEvent';

@EventSubscriber()
export class EverythingSubscriber implements EntitySubscriberInterface {


    /**
     * Indicates that this subscriber only listen to Post events.
     */
    // listenTo() {
    //     return HtmlElementData;
    // }

    /**
     * Called before post insertion.
     */
    afterLoad(entity: any, event?: LoadEvent<any>) {
        // console.log(`afterLoad: `, event && event.entity);
    }

    /**
     * Called before entity insertion.
     */
    beforeInsert(event: InsertEvent<any>) {
        // console.log(`BEFORE ENTITY INSERTED: `, event.entity);
    }


}
