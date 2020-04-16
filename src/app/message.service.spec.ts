import { MessageService } from "./message.service";

describe("MessageService", () => {
  let service: MessageService;

  beforeEach(() => {
    service = new MessageService();
  });

  it("should initialize with no messages", () => {
    expect(service.messages.length).toBe(0);
  });

  it("should add a new message", () => {
    service.add("A message");
    expect(service.messages.length).toBeGreaterThan(0);
  });

  it("should remove all messages", () => {
    service.add("Another message");
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});
