import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../user/entities/user.entity';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { DocumentEntity } from './entities/document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(DocumentEntity)
    private documentRepository: Repository<DocumentEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}
  async create(data: CreateDocumentDto) {
    const { title, content, createdBy } = data;
    const user = await this.userRepository.findOne(createdBy);
    const res = await this.documentRepository.insert({
      title,
      content,
      createdBy: user,
    });
    return res;
  }

  async findAll() {
    return await this.documentRepository.find();
  }

  async findOne(id: string) {
    return await this.documentRepository.findOne(id);
  }

  async update(id: string, data: UpdateDocumentDto) {
    const { title, content } = data;
    return await this.documentRepository.update(id, {
      title,
      content,
    });
  }

  async remove(id: string) {
    return await this.documentRepository.delete(id);
  }
}
