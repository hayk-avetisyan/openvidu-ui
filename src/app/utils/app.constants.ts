export default class AppConstant {
  public static readonly SECRET = "Hello";
  public static readonly CONFIGURATION_SERVER = "http://localhost:9000/";
  public static readonly CONNECTION_CREATE_URL = AppConstant.CONFIGURATION_SERVER + "connection/create";
  public static readonly ROOM_CREATE_URL = AppConstant.CONFIGURATION_SERVER + "session/create";
}
