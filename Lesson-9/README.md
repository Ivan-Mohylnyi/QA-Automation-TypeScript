# Lesson 9 - OOP in TypeScript. Principles. SOLID. DRY

A new abstraction sequence (not the boiler/animal/shape examples from the assignment): a **notification dispatch** domain.

## Class hierarchy

- `Notification` (abstract) - shared state (`recipient`, `priority`, `channel`, `sentCount`) and one shared helper (`logDelivery`); implements `INotifiable`.
- `EmailNotification extends Notification` - adds a `subject`.
- `SmsNotification extends Notification` - truncates messages over the SMS character limit.
- `UrgentEmailNotification extends EmailNotification implements IUrgentNotifiable` - a second-level subclass that adds an extra, narrow capability (`sendUrgent`) on top of `EmailNotification`, without changing `EmailNotification` or `Notification`.

## OOP pillars

1. **Encapsulation** - each class manages its own state (`sentCount`, `subject`, the SMS length limit) and exposes it only through methods.
2. **Inheritance** - `EmailNotification`/`SmsNotification` extend `Notification`; `UrgentEmailNotification` extends `EmailNotification`.
3. **Abstraction** - `Notification` is abstract and defines the shared contract (`send`) plus reusable logic (`logDelivery`), without knowing how any specific channel actually sends a message.
4. **Polymorphism** - `dispatchNotification` calls `send()` on whatever `INotifiable` it receives; the actual behaviour differs per concrete class.

## SOLID

- **S - Single Responsibility**: `Notification` only tracks shared notification state; each subclass only knows its own channel's formatting.
- **O - Open/Closed**: a new channel (e.g. `PushNotification`) can be added by extending `Notification`, with zero changes to `dispatchNotification` or any existing class.
- **L - Liskov Substitution**: `EmailNotification`, `SmsNotification` and `UrgentEmailNotification` are all used interchangeably as `INotifiable` in `index.ts`'s `notifiables` array.
- **I - Interface Segregation**: `INotifiable` (`send`) and `IUrgentNotifiable` (`sendUrgent`) are two separate, narrow interfaces - a channel that can't send urgent messages never has to implement `sendUrgent`.
- **D - Dependency Inversion**: `dispatchNotification`/`dispatchUrgentNotification` depend only on `INotifiable`/`IUrgentNotifiable`, never on a concrete class.

## Project structure

- `src/i-notifiable.ts`, `src/i-urgent-notifiable.ts` - the two narrow interfaces.
- `src/notification-props.ts` - shared constructor prop types.
- `src/notification.ts` - abstract base class.
- `src/email-notification.ts`, `src/sms-notification.ts` - concrete channels.
- `src/urgent-email-notification.ts` - second-level subclass adding urgent delivery.
- `src/notification-dispatch.ts` - the functions required by the assignment: each accepts an interface as its parameter and works with any instance implementing it.
- `src/index.ts` - creates instances of all three concrete classes and calls the dispatch functions with them.

## Commands

```bash
npm install
npx tsx src/index.ts
npm run run          # tsc --build && eslint ./src
```
