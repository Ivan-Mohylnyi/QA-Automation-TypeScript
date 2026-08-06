import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
import { AutomationExerciseWorld } from './worlds/automation-exercise.world';

setDefaultTimeout(60 * 1000);
setWorldConstructor(AutomationExerciseWorld);
