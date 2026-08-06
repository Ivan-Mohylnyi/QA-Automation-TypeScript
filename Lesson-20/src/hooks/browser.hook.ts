import { AfterAll, BeforeAll } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { AutomationExerciseWorld } from '../worlds/automation-exercise.world';

export function browserHook(): void {
    BeforeAll(async function () {
        AutomationExerciseWorld.browser = await chromium.launch({ headless: true });
    });

    AfterAll(async function () {
        await AutomationExerciseWorld.browser.close();
    });
}
