import {Ticket} from '../models/ticket';
import {Repository} from './repository';

export class TicketRepository extends Repository<Ticket> {
  constructor() {
    super('Ticket');
  }

  protected serialize(model: Ticket) {
    return {...model};
  }

  protected deserialize(model: any): Ticket {
    let ticket: Ticket = new Ticket();
    ticket.id = model.id;
    ticket.motivo = model.motivo;
    ticket.descricao = model.descricao;
    return ticket;
  }
}
