import { ContainerFileSystem } from "../../containers/index.js";
import { config } from "../../config/index.js";

export class MessagesFilesystem extends ContainerFileSystem {
  constructor() {
    super(config.DATABASES.filesystem.MESSAGES_FILENAME);
  }
}
